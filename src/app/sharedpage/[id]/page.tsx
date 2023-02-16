'use client';
import Editor from "@/components/Editor";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { share } from "../../../../slices/userSlice";

export default function Page({params}) {
    const local = useSelector((state) => state.settings.localCode)
    const dispatch = useDispatch()
    useEffect(() => {
        const a = dispatch(share({type: 'link', payload: params}))
        console.log(a)
    }, [])
    
    return (
        <Editor params={params}/>
    )
}