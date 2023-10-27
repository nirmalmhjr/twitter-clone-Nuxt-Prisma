
export default (url, options = {}) => {
    const { useAuthToken } = useAuth()

    // console.log('form useFetchAPI token is ',useAuthToken().value);

    return $fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${useAuthToken().value}`
        },
    })
}
