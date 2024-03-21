import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { packFilters } from "@/lib/filters";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardIcon, Loader2, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { checkDuplicatePack, upsertPack } from "@/app/actions";

const PackViewer = dynamic(() => import("@/components/site/pack/pack-viewer"), {
  loading: () => (
    <Skeleton className='flex h-64 items-center justify-center bg-background'>
      <Loader2 className='size-4 animate-spin' />
    </Skeleton>
  ),
});

const urlPattern = /(?:https?:\/\/)?(?:www\.)?[^\s.]+\.\w{2,6}(?:[\/?#]\S*)?/;
const formSchema = z.object({
  title: z
    .string()
    .max(20, {
      message: "Title is too long",
    })
    .refine(
      // can't include special characters, allow !?.-_space& and …
      (value) => {
        return !value.match(/[^a-zA-Z0-9 !?.-_…&]/);
      },
      {
        message: "Title can only contain letters and numbers",
      }
    )
    .refine((value) => !value.match(urlPattern), {
      message: "Title cannot contain a URL",
    }),
  packCode: z
    .string()
    .refine(
      (value) => {
        try {
          const parsed = JSON.parse(value);
          if (typeof parsed !== "object") return false;
          if (parsed.Title === undefined) return false;
          if (parsed.Minion === undefined) return false;
          if (parsed.Minions === undefined) return false;
          if (parsed.Spells === undefined) return false;
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Invalid JSON",
      }
    )
    .refine(
      (value) => {
        try {
          const parsed = JSON.parse(value);
          if (parsed.Minions.length !== 60) return false;
          if (parsed.Spells.length !== 17) return false;
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Pcak must contain 60 minions and 17 spells",
      }
    ),
  packDescription: z
    .string()
    .max(200, {
      message: "Description is too long",
    })
    .refine((value) => !value.match(urlPattern), {
      message: "Description cannot contain a URL",
    }),
  archetype: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export type PackEditorForm = z.infer<typeof formSchema>;

type EditorFormProps = {
  defaultValues?: PackEditorForm;
  id?: string;
  handleClose: () => void;
  onTitleChange: (title: string) => void;
  onMinionChange: (minionId: string) => void;
};

function EditorForm({
  defaultValues,
  id,
  handleClose,
  onTitleChange,
  onMinionChange,
}: EditorFormProps) {
  const [hasPackCode, setHasPackCode] = useState(!!defaultValues?.packCode);
  const [code, setCode] = useState(
    defaultValues?.packCode ? JSON.parse(defaultValues.packCode) : null
  );
  const [loading, setLoading] = useState(false);
  const form = useForm<PackEditorForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      packCode: defaultValues?.packCode || "",
      packDescription: defaultValues?.packDescription || "",
      archetype: defaultValues?.archetype || ["Standard"],
    },
  });
  const isEdit = !!defaultValues;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (!defaultValues) {
        const isDuplicate = await checkDuplicatePack(values.packCode);
        if (isDuplicate) {
          form.setError("packCode", {
            type: "manual",
            message: "Pack with the exact same team already exists",
          });
          return;
        }
      }
      await upsertPack({ ...values, id });
      if (defaultValues) {
        toast.success("Pack updated");
      } else {
        toast.success("Pack created");
      }
      handleClose();
      // reset form
      form.reset();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "packCode") {
        if (value.packCode) {
          // try parsing the pack code and set the title from the Title field
          try {
            const parsed = JSON.parse(value.packCode);
            if (parsed.Title && parsed.Minion) {
              form.setValue("title", parsed.Title);
              onTitleChange(parsed.Title);
              setHasPackCode(value.packCode.length > 0);
              setCode(parsed);
              const minion = parsed?.Minion;
              if (minion) {
                onMinionChange(minion);
                // remove set packCode error
                form.clearErrors("packCode");
                // focus on description
                form.setFocus("packDescription");
              }
            }
          } catch {
            // do nothing
          }
        } else {
          setHasPackCode(false);
          setCode(null);
        }
      }
      if (name === "title" && type === "change") {
        onTitleChange(value.title || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, defaultValues?.packCode]);
  // setFocus to title if isEdit, else packCode
  useEffect(() => {
    if (isEdit) {
      form.setFocus("title");
    } else {
      form.setFocus("packCode");
    }
  }, [isEdit]);
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      form.setValue("packCode", text);
    } catch {
      toast.error("Failed to read from clipboard");
    }
  };
  const handleClearCode = () => {
    form.setValue("packCode", "");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 px-6'>
        {hasPackCode && (
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='My pack' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name='packCode'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center justify-between'>
                <FormLabel>Code</FormLabel>
                {!hasPackCode ? (
                  <Button
                    onClick={handlePaste}
                    size='sm'
                    variant='active'
                    type='button'
                  >
                    Paste from clipboard{" "}
                    <ClipboardIcon className='ml-1.5 size-3.5' />
                  </Button>
                ) : (
                  <Button
                    onClick={handleClearCode}
                    size='sm'
                    variant='active'
                    type='button'
                  >
                    Clear code <Trash className='ml-1.5 size-3.5' />
                  </Button>
                )}
              </div>
              <FormControl>
                <Textarea
                  placeholder='Paste your pack code here'
                  className={cn(
                    "resize-none",
                    hasPackCode ? "hide-scrollbar h-8 min-h-0" : "h-36"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='packDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='This pack...'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add any additional information about your pack here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!!code && <PackViewer pack={{ code }} />}
        <FormField
          control={form.control}
          name='archetype'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>Archetype</FormLabel>
                <FormDescription>
                  Select the archetype(s) of your pack
                </FormDescription>
              </div>
              <div className='grid grid-cols-2 gap-x-8 gap-y-1.5'>
                {packFilters.map((item) => {
                  if (item.value === "all") return null;
                  return (
                    <FormField
                      key={item.value}
                      control={form.control}
                      name='archetype'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={`item-${item.value}`}
                            className='flex w-full flex-row items-start space-x-3 space-y-0 hover:bg-foreground/5'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.name)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.name,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.name
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='flex-1 text-sm font-normal'>
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          disabled={
            loading || !form.formState.isValid || !form.formState.isDirty
          }
        >
          {loading ? (
            <Loader2 className='size-4 animate-spin' />
          ) : isEdit ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default EditorForm;
