const APIUrl = "https://86yfl7-8080.csb.app/books";

const getData = function (url) {
    return new Promise((resolve, reject)=>{
        fetch(url)
            .then(res => {
                if(res.ok)
                    return res.json()
                throw new Error("Error")
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
    
    })
}

const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

export { getData, APIUrl, scrollTop }