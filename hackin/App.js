import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Sos from "./screens/SOS";
import Complaint from "./screens/Complaint";
import Forum from "./screens/Forum";
import Home from "./screens/Home";
import Contribute from "./screens/Contribute";
import Adminer from "./screens/Admin";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Profiler from "./screens/Profile";
import Announcement from "./screens/Announcement";
import TOS from "./screens/TOS";
import Privacy from "./screens/Privacy";
import StateWise from "./screens/admin_control/StateWise";
import ComplaintPosts from "./screens/admin_control/ComplaintPosts";
import AddAnnouncement from "./screens/admin_control/AddAnnouncement";
import Resource from "./screens/Resource";
import Request_Resource_Cat from "./screens/admin_control/Request_Resource_Cat";
import ResourceRequestsScreen from "./screens/admin_control/ResourceRequestsScreen";
import VerifyContributors from "./screens/admin_control/VerifyContributors";
import SosDetails from "./screens/SosDetails";
import Map from "./screens/Map";
import WaterState from "./Data";
import ForumPost from './screens/ForumPost'
import AddPostScreen from "./screens/AddForumPost";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Stacker = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => {
          return (
            <Ionicons
              name="person"
              onPress={() => {
                navigation.navigate("Profile");
              }}
              size={32}
              color="black"
              style={{ marginRight: 5, marginTop: 5 }}
            />
          );
        },
      })}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Announcement" component={Announcement} />
      <Stack.Screen name="Complaint" component={Complaint} />
      <Stack.Screen name="Contribute" component={Contribute} />
    </Stack.Navigator>
  );
};
const Emergency = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="mainemergency">
        <Stack.Screen
          name="mainemergency"
          component={Sos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SosDetails"
          component={SosDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};
const Forums=()=>{
  return(
    <Stack.Navigator screenOptions={({ navigation }) => ({
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => {
        return (
          <AntDesign
            name="pluscircle"
            onPress={() => {
              navigation.navigate("AddPostScreen");
            }}
            size={32}
            color="black"
            style={{ marginRight: 5, marginTop: 5 }}
          />
        );
      },
    })}>
      <Stack.Screen name="Forum" component={Forum}/>
      <Stack.Screen name="ForumPost" component={ForumPost}/>
      <Stack.Screen name="AddPostScreen" component={AddPostScreen}/>
    </Stack.Navigator>
  )
}
const NormalUser = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => {
          return (
            <Ionicons
              name="person"
              onPress={() => {
                navigation.navigate("Profile");
              }}
              size={32}
              color="black"
              style={{ marginRight: 5, marginTop: 5 }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Stacker"
        component={Stacker}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="HeatMap"
        component={Map}
        options={{
          title: "HeatMap",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="map" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="SOS"
        component={Emergency}
        options={{
          title: "SOS",
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="dangerous" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Resource"
        component={Resource}
        options={{
          title: "Request Resource",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="warning" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="CommunityForum"
        component={Forums}
        options={{
          title: "Forum",headerShown:false,
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="forum" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
const Profile = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={Profiler} />
      <Stack.Screen name="contribute" component={Contribute} />
      <Stack.Screen name="tos" component={TOS} />
      <Stack.Screen name="privacy" component={Privacy} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <>
      <NavigationContainer>
        <WaterState>
          <StatusBar style="auto" />
          <Stack.Navigator
            // initialRouteName="adminmain"
            screenOptions={{
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "JalSamadhan",
                headerLeft: () => {
                  return <Ionicons name="add-circle" color="white"></Ionicons>;
                },
              }}
            />
            <Stack.Screen
              name="NormalUser"
              component={NormalUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="adminmain" component={Adminer} />
            <Stack.Screen name="States" component={StateWise} />
            <Stack.Screen name="ComplaintPosts" component={ComplaintPosts} />
            <Stack.Screen name="AddAnnouncement" component={AddAnnouncement} />
            <Stack.Screen
              name="Request_Resource_Cat"
              component={Request_Resource_Cat}
            />
            <Stack.Screen
              name="ResourceRequestsScreen"
              component={ResourceRequestsScreen}
            />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen
              name="VerifyContributors"
              component={VerifyContributors}
            />
          </Stack.Navigator>
        </WaterState>
      </NavigationContainer>
    </>
  );
}
