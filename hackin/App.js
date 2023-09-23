import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Home from "./screens/Home";
import Forum from "./screens/Forum";
import Resource from "./screens/Resource";
import SOS from "./screens/SOS";
import Login from "./screens/Login";
import TOS from "./screens/TOS";
import Signup from "./screens/Signup";
import Privacy from "./screens/Privacy";
import Complaint from "./screens/Complaint";
import Announcement from "./screens/Announcement";
import Admin from './screens/Admin'
import Profile from './screens/Profile'
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={({ navigation }) => ({
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
    })}>
      <Stack.Screen
        name="home"
        component={Home}
        
      />
      <Stack.Screen name="Announcement" component={Announcement} />
    </Stack.Navigator>
  );
};
const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomePage"
        component={HomeStack}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Resource"
        component={Resource}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="shopping-bag" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="SOS"
        component={SOS}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="dangerous" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Forum"
        component={Forum}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="chat" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Complaint"
        component={Complaint}
        options={{
          
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="warning" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Admin" component={Admin}/>
        <Stack.Screen
          name="Normal"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TOS" component={TOS} />
        <Stack.Screen name="Privacy" component={Privacy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
