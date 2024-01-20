import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayoutNav() {
    return (
        <Tabs>
          <Tabs.Screen 
            name="one" 
            options={{tabBarIcon: ({color}) => <Ionicons name="barcode" color={color} size={30} />, tabBarLabel: "One"}} />
        </Tabs>
    );
  }
  