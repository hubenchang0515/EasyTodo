let globalDomain:string = ""

async function GetJson(response:Response): Promise<any> {
    try {
        let copy = response.clone()
        return await copy.json()
    } catch(err) {
        return await response.text()
    }
}

async function SetDomain(domain: string): Promise<void> {
    globalDomain = domain
}

async function GetAsync(url: string, param?: object): Promise<[any, number, string]> {
    let args = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(param)
    }

    let response = await fetch(globalDomain + url, args)
    let data = await GetJson(response)
    return [data, response.status, response.statusText]
}

async function PostAsync(url: string, param?: object): Promise<[any, number, string]> {
    let args = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: param ? JSON.stringify(param) : null
    }

    let response = await fetch(globalDomain + url, args)
    let data = await GetJson(response)
    return [data, response.status, response.statusText]
}


const Request = {
    GetAsync: GetAsync,
    PostAsync: PostAsync,
    SetDomain: SetDomain,
}


export default Request