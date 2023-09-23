import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Forum from "./screens/Forum";
import Resource from "./screens/Resource";
import SOS from "./screens/SOS";
import Login from "./screens/Login";
import TOS from "./screens/TOS";
import Signup from "./screens/Signup";
import Privacy from "./screens/Privacy";
import Complaint from "./screens/Complaint";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage" component={Home} />
      <Tab.Screen name="Resource" component={Resource} />
      <Tab.Screen name="SOS" component={SOS} />
      <Tab.Screen name="Forum" component={Forum} />
      <Tab.Screen name="Complaint" component={Complaint} />
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
