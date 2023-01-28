import React from 'react';
import {
    View,
    Text,
    Switch
} from 'react-native';

const AddonSelector=(props)=>{

    return (
        <View style={{ flexDirection: 'column', width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={props.value ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={props.handleAddons}
                    value={props.value}
                />
                <Text style={{ color: "black", fontWeight: '700' }}>
                    {props.value ? "Addons Added" : "Addons"}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30, paddingVertical: 10 }}>
                <Text style={{ color: "black", fontWeight: '700' }}>
                    {props.nameAddon}
                </Text>
                <Text style={{ color: "black", fontWeight: '700' }}>
                    {props.priceAddons} Rs
                </Text>
            </View>
        </View>
    )
}


export default AddonSelector;