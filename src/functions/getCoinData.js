import axios from "axios";

export const getCoinData = (id) => {
    const myData = axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then((response) => {
        // console.log("prices", response.data);
        return response.data;
    }).catch((error) => {
        console.log("err", error);
    });
    return myData;
}






// const res = await axios.get(
//     `https://api.coingecko.com/api/v3/coins/${id}`
//   );
//   console.log(res);
//   coinObject(setCoinData, res.data);
//   setIsLoading(false);