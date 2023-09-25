import { useState } from "react";
import Context from "./ContextAPI";
import axios from "axios";
const WaterState = ({ children }) => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [state, setstate] = useState("");
  const [admin, setadmin] = useState(false);
  const [authtoken, setauthtoken] = useState(null);
  const [location, setLocation] = useState(null);
  const stateAndUTData = [
    {
      id: "1",
      name: "Andaman and Nicobar Islands",
      latitude: 11.7401,
      longitude: 92.6586,
    },
    { id: "2", name: "Andhra Pradesh", latitude: 15.9129, longitude: 79.74 },
    {
      id: "3",
      name: "Arunachal Pradesh",
      latitude: 27.1004,
      longitude: 93.6167,
    },
    { id: "4", name: "Assam", latitude: 26.2006, longitude: 92.9376 },
    { id: "5", name: "Bihar", latitude: 25.0961, longitude: 85.3131 },
    { id: "6", name: "Chandigarh", latitude: 30.7333, longitude: 76.7794 },
    { id: "7", name: "Chhattisgarh", latitude: 21.2787, longitude: 81.8661 },
    {
      id: "8",
      name: "Dadra and Nagar Haveli and Daman and Diu",
      latitude: 20.1809,
      longitude: 73.0169,
    },
    { id: "9", name: "Delhi", latitude: 28.6139, longitude: 77.209 },
    { id: "10", name: "Goa", latitude: 15.2993, longitude: 74.124 },
    { id: "11", name: "Gujarat", latitude: 22.2587, longitude: 71.1924 },
    { id: "12", name: "Haryana", latitude: 29.0588, longitude: 76.0856 },
    {
      id: "13",
      name: "Himachal Pradesh",
      latitude: 31.1048,
      longitude: 77.1734,
    },
    {
      id: "14",
      name: "Jammu and Kashmir",
      latitude: 33.7782,
      longitude: 76.5762,
    },
    { id: "15", name: "Jharkhand", latitude: 23.6102, longitude: 85.2799 },
    { id: "16", name: "Karnataka", latitude: 15.3173, longitude: 75.7139 },
    { id: "17", name: "Kerala", latitude: 10.8505, longitude: 76.2711 },
    { id: "18", name: "Ladakh", latitude: 34.1526, longitude: 77.5771 },
    { id: "19", name: "Lakshadweep", latitude: 10.5667, longitude: 72.6417 },
    { id: "20", name: "Madhya Pradesh", latitude: 23.6345, longitude: 77.7921 },
    { id: "21", name: "Maharashtra", latitude: 19.7515, longitude: 75.7139 },
    { id: "22", name: "Manipur", latitude: 24.6637, longitude: 93.9063 },
    { id: "23", name: "Meghalaya", latitude: 25.467, longitude: 91.3662 },
    { id: "24", name: "Mizoram", latitude: 23.685, longitude: 92.3476 },
    { id: "25", name: "Nagaland", latitude: 26.1584, longitude: 94.5624 },
    { id: "26", name: "Odisha", latitude: 20.9517, longitude: 85.0985 },
    { id: "27", name: "Puducherry", latitude: 11.9416, longitude: 79.8083 },
    { id: "28", name: "Punjab", latitude: 31.1471, longitude: 75.3412 },
    { id: "29", name: "Rajasthan", latitude: 27.0238, longitude: 74.2179 },
    { id: "30", name: "Sikkim", latitude: 27.533, longitude: 88.5122 },
    { id: "31", name: "Tamil Nadu", latitude: 11.1271, longitude: 78.6569 },
    { id: "32", name: "Telangana", latitude: 18.1124, longitude: 79.0193 },
    { id: "33", name: "Tripura", latitude: 23.9408, longitude: 91.9882 },
    { id: "34", name: "Uttar Pradesh", latitude: 26.8467, longitude: 80.9462 },
    { id: "35", name: "Uttarakhand", latitude: 30.0668, longitude: 79.0193 },
  ];
  const BASE_URL = "https://bytebrigade-2023-default-rtdb.firebaseio.com";

  // Authorization
  const signUp = async (name, phone, state) => {
    try {
      setname(name);
      setphone(phone);
      setstate(state);
      const response = await axios.post(`${BASE_URL}/user.json`, {
        name,
        phone,
        state,
        admin,
      });
      return response.data;
    } catch (error) {
      console.error("Error during sign-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };

  // User Login function
  const login = async (phone) => {
    try {
      setphone(phone);
      const response = await axios.get(`${BASE_URL}/user.json`);
      console.log(response.data)
      for (i in response.data) {
        if (response.data[i].phone === phone) {
          setname(response.data[i].name);
          setstate(response.data[i].state);
          return response.data[i];
        }
      }
      return {};
    } catch (error) {
      console.log(error);
      console.error("Error during login:", error);
      return { success: false, error: "Error occurred during login" };
    }
  };

  //AUTHORIZATION

  //Announcement
  const AddAnn = async (title, desc) => {
    try {
      const response = await axios.post(`${BASE_URL}/announcement.json`, {
        title,
        desc,
      });
      return response.data;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  const getAnn = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/announcement.json`);
      let arr = [];
      for (i in response.data) {
        arr.push(response.data[i]);
      }
      return arr;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  //aNNOUNCEMENT

  //SOS
  const SOS = async (image,category, details, longitude, latitude) => {
    try {
      const response = await axios.post(`${BASE_URL}/SOS.json`, {
        name,
        phone,
        state,
        image,
        category,
        details,
        longitude,
        latitude,
      });
      return response.data;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  //SOS

  //COMPLAINT
  const COMPLAINT = async (image, details, add) => {
    try {
      let resolved = false;
      const response = await axios.post(`${BASE_URL}/Complaints.json`, {
        name,
        phone,
        state,
        image,
        details,
        add,
        resolved,
      });
      return response.data;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  const getComplaints = async (stater) => {
    try {
      const response = await axios.get(`${BASE_URL}/Complaints.json`);
      let arr = [];
      for (i in response.data) {
        if (response.data[i].state === stater) {
          const obj = {
            id: i,
            name: response.data[i].name,
            phone: response.data[i].phone,
            state: response.data[i].state,
            image: response.data[i].image,
            add: response.data[i].add,
            details: response.data[i].details,
            resolved: response.data[i].resolved,
          };
          arr.push(obj);
        }
      }
      return arr;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };

  const ResolveComplaint = async (id) => {
    try {
      const okay = await axios.get(`${BASE_URL}/Complaints/${id}.json`);
      const obj = okay.data;
      let verified;
      console.log(obj.resolved)
      if (obj.resolved === 1) {
        verified = 0;
      } else {
        verified = 1;
      }
      console.log(verified);
      const response = await axios.put(`${BASE_URL}/Complaints/${id}.json`, {
        id: i,
        name: obj.name,
        phone: obj.phone,
        state: obj.state,
        image: obj.image,
        add: obj.add,
        details: obj.details,
        resolved: verified,
      });
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
//COMPLAINT

  //HEATMAP DATA FETCH
  const getPoints = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/SOS.json`);
      let arr = [];
      for (i in response.data) {
        const obj = {
          latitude: response.data[i].latitude,
          longitude: response.data[i].longitude,
        };
        arr.push(obj);
      }
      return arr;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  //HEATMAP DATA FETCH

  //CONTRIBUTOR
  const AddContri = async (
    Name,
    Phone,
    Address,
    Category,
    State,
    Aadhar,
    Pan,
    Doc
  ) => {
    try {
      let verified = 0;
      const response = await axios.post(`${BASE_URL}/Contributor.json`, {
        Name,
        Phone,
        Address,
        Category,
        State,
        Aadhar,
        Pan,
        Doc,
        verified,
      });
      return response.data;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  const getContris = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Contributor.json`);
      let arr = [];
      for (i in response.data) {
        const obj = {
          Id: i,
          Name: response.data[i].Name,
          Phone: response.data[i].Phone,
          Address: response.data[i].Address,
          Category: response.data[i].Category,
          State: response.data[i].State,
          Aadhar: response.data[i].Aadhar,
          Pan: response.data[i].Pan,
          verified: response.data[i].verified,
        };
        arr.push(obj);
      }
      return arr;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  const ApproveContri = async (id, veri) => {
    try {
      let verified = 0;
      const okay = await axios.get(`${BASE_URL}/Contributor/${id}.json`);
      const obj = okay.data;
      console.log(obj);
      const response = await axios.put(`${BASE_URL}/Contributor/${id}.json`, {
        Name: obj.Name,
        Phone: obj.Phone,
        Address: obj.Address,
        Category: obj.Category,
        State: obj.State,
        Aadhar: obj.Aadhar,
        Pan: obj.Pan,
        verified: veri,
      });
      return response.data;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  //CONTRIBUTOR

  //RESOURCE
  const AddResReq = async (details, add, latitude, longitude) => {
    try {
      let solved = 0;
      let cat="";
      console.log(latitude, longitude);
      const response = await axios.post(`${BASE_URL}/Resource.json`, {
        details,
        add,
        latitude,
        longitude,
        cat,
        solved,
      });
      const cattter=await axios.put(`https://categorizer.onrender.com/Resource/${response.data.name}`,{description:details});
      return cattter.data;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  const GetResReq = async (cat) => {
    try {
      const response = await axios.get(`${BASE_URL}/Resource.json`);
      let arr = [];
      for (i in response.data) {
        if (response.data[i].cat === cat) {
          arr.push({
            id: i,
            details: response.data[i].details,
            add: response.data[i].add,
            latitude: response.data[i].latitude,
            longitude: response.data[i].longitude,
            cat: response.data[i].cat,
            solved: response.data[i].solved,
          });
        }
      }
      return arr;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  const ApproveReq = async (id, veri) => {
    try {
      const response = await axios.get(`${BASE_URL}/Resource/${id}.json`);
      const okay = await axios.put(`${BASE_URL}/Resource/${id}.json`, {
        details: response.data.details,
        add: response.data.add,
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        cat: response.data.cat,
        solved: veri,
      });
      console.log("ok");
      return okay.data;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  //RESOURCE

  //FORUM
  const AddForumPost = async (title, desc, img) => {
    try {
      let upvotes = 0;
      let comments = ["init"];
      const response = await axios.post(`${BASE_URL}/Forum.json`, {
        name,
        phone,
        state,
        title,
        desc,
        upvotes,
        comments,
        img,
      });
      return response.data;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  const getForumPost = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Forum.json`);
      let arr = [];
      for (i in response.data) {
        if (response.data[i].state === state) {
          const obj = {
            id: i,
            name: response.data[i].name,
            phone: response.data[i].phone,
            state: response.data[i].state,
            title: response.data[i].title,
            desc: response.data[i].desc,
            img: response.data[i].img,
            comments: response.data[i].comments,
            upvotes: response.data[i].upvotes,
          };
          console.log(obj);
          arr.push(obj);
        }
      }
      console.log(arr);
      return arr;
    } catch (error) {
      console.error("Error during add-up:", error);
      return { success: false, error: "Error occurred during sign-up" };
    }
  };
  return (
    <Context.Provider
      value={{
        stateAndUTData,
        setauthtoken,
        authtoken,
        name,
        setname,
        phone,
        setphone,
        state,
        setstate,
        signUp,
        login,
        AddAnn,
        getAnn,
        SOS,
        COMPLAINT,
        getComplaints,
        getPoints,
        setadmin,
        AddContri,
        getContris,
        ApproveContri,
        AddResReq,
        GetResReq,
        ApproveReq,
        AddForumPost,
        getForumPost,
        ResolveComplaint,setLocation,location
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default WaterState;
