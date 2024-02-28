'use cilent'

import useUser from '@/hooks/use-user'

const withUser = (WrappedComponent: React.ComponentType<any>) => {
  const WithUser = (props: any) => {
    const { user } = useUser()
    return <WrappedComponent {...props} user={user} />
  }

  WithUser.displayName = `WithUser(${getDisplayName(WrappedComponent)})`

  return WithUser
}

export default withUser

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
