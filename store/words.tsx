import MMKVStorage from "react-native-mmkv-storage";

const MMKV = new MMKVStorage.Loader().initialize();

const initialStore = [
    'React',
    'Native',
    'sometimes',
    'supplies',
    'problems',
    'my',
    'ass',
    'but',
    'funny'
]

export const setInitialWord = async () => {
    try {
        await MMKV.setArrayAsync('initialWord', initialStore);
    } catch (err) {

    }
}

export const getInitialWord = async () => {
    try {
        return await MMKV.getArrayAsync('initialWord');
    } catch(err) {

    }
}

export const setWordInBoard = async (data: string[]) => {
    try{
        return await MMKV.setArrayAsync('boardWord', data);
    } catch(err) {

    }
}

const getWordInBoader = async () => {
    try{
        return await MMKV.getArrayAsync('boardWord');
    } catch(err) {

    }
}

export const checkBoard = async () => {
    const difference = ( 
        initial: string[],
        current: string[]
    ) => initial.join() === current.join();

    const initial: string[] | undefined = await getInitialWord();
    const current: string[] | undefined = await getWordInBoader();
    if(initial && current) {
        const result = difference(initial, current);
        return result;
    } else {
        return false;
    }
}