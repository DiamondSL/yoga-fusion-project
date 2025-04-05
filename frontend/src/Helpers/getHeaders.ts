import {headers} from 'next/headers'


async function getHeaders(header: string) {
    let requested: string | undefined | null = ''
    await headers().then((result) => {
        return result
    }).then((result) => {
        requested = result?.get(header)?.toString()
    })

    return requested
}

export default getHeaders;