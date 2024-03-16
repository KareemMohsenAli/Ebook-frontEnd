import axios from "axios";
const BASE_URL = "http://localhost:5000/users";
const options = {

    

};

export const FetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options, {headers: {'Content-Type': 'application/json'}});
  return data;
};

//    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>setVideos(data.items))