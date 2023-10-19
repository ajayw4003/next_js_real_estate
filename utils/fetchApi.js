import axios from 'axios';

export const baseUrl = "https://bayut.p.rapidapi.com";


export const fetchAPi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      'X-RapidAPI-Key': '8b235bb3c2msh2a8aab2a42ae8a1p12d903jsn94147cccca7e',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  })
  return data;
}