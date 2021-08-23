
const getResources = async (url)=> {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    const data = await response.json();
    const result = await data;
    const answer = await result;
    return answer;
};

export {getResources};