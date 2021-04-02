import {useState, useCallback} from 'react'

const userHttp = () => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const request = useCallback(async (url, method='GET', headers = {}, body=null)=> {
        setLoading(true)
        try{
            if(body){
                body = JSON.stringify(body)
            }
            const response = await fetch(url, {
                method,
                headers,
                body
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message || 'Something went wrong')
            }
            setLoading(false)
            return data
        }catch(e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])
    return {isLoading, error, request}
}

export default userHttp