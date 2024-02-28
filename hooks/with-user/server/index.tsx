import { getUserDetails } from '@/utils/supabase/server';

const withUser = (WrappedComponent: React.ComponentType<any>) => {
    const WithUser = async (props: any) => {
        const { user } = await getUserDetails();
        return <WrappedComponent {...props} user={user} />;
    };

    WithUser.displayName = `WithUser(${getDisplayName(WrappedComponent)})`;

    return WithUser;
};

export default withUser;

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
