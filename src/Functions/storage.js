import AsyncStorage from '@react-native-async-storage/async-storage';

export const SaveSettings = async (key, value) => {
    try{
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error);
    }
};

export const GetSettings = async key => {
    try{
        const value = AsyncStorage.getItem(key);
        return value !== null ? value : null;
    } catch (error) {
        console.error(`Failed to get data for ${key}. ${error}`);
    }
};

export const RemoveSettings = async key => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(error) {
        console.error(error);
        return false;
    }
};
