import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { s } from "react-native-size-matters";
import CategoriesScreen from "../screens/CategoriesScreen";
import SavedScreen from "../screens/SavedScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: "#30364f",
                borderTopColor: "#f0f0db"
            },
            headerShown: false,
            tabBarActiveTintColor: "#e1d9bc",
            tabBarInactiveTintColor: "#acbac4",
            tabBarIcon: ({ color }) => {
                return (color = "#e1d9bc");
            }
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                tabBarIcon: ({ focused, size, color }) => {
                    return (
                        <Ionicons name={focused ? "home-sharp" : "home-outline"} size={s(size)} color={color} />
                    )
                }
            }} />
            <Tab.Screen name="CategoriesScreen" component={CategoriesScreen} options={{
                tabBarIcon: ({ focused, size, color }) => {
                    return (
                        <Ionicons name={focused ? "albums-sharp" : "albums-outline"} size={s(size)} color={color} />
                    )
                }
            }} />
            <Tab.Screen name="SavedScreen" component={SavedScreen} options={{
                tabBarIcon: ({ focused, size, color }) => {
                    return (
                        <Ionicons name={focused ? "bookmarks-sharp" : "bookmarks-outline"} size={s(size)} color={color} />
                    )
                }
            }} />
        </Tab.Navigator>
    );
}