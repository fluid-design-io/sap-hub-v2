import BannerEar from '@/components/icon/banner-ear';

export const Banner = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative flex h-10 items-center justify-between border-y-2 border-black bg-[#DFC6A9] px-6 text-[#823E01]">
            <BannerEar className="absolute -left-3 top-[-2px] z-[-1] h-12 translate-x-[-1px]" />
            <BannerEar className="absolute -right-3 top-[-2px] z-[-1] h-12 translate-x-[1px] -scale-x-100" />
            {children}
        </div>
    );
};
