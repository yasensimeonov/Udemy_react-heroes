import {useEffect, useRef, useState} from "react";
import {Hero} from "../types/hero.ts";
import {useParams} from "react-router-dom";
import {useMessages} from "../context/MessageContext.tsx";
import HeroForm from "./HeroForm.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

// type Props = {
//     hero?: Hero;
//     onChangeName?: (event: ChangeEvent<HTMLInputElement>) => void;
// }

export default function HeroDetail(
    // {hero, onChangeName}: Props

) {
    const [hero, setHero] = useState<Hero | null>(null);
    const params = useParams();
    const fetched = useRef(false);
    const {addMessage} = useMessages();

    useEffect(() => {
        if (!fetched.current) {
            fetch(`${apiUrl}/heroes/${params.id}`).then(res => {
                return res.json();
            }).then(data => {
                setHero(data);
                addMessage(`Hero ${data.name} loaded.`);
            })
            fetched.current = true;
        }

        // // Cleanup code
        // return () => {
        //     // Cleanup code
        // }
    }, [params.id, addMessage]);

    if (!hero) {
        return null;
    }

    // const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setHero({...hero, name: event.target.value});
    // }

    return (
        <>
            <h2 className='text-2xl'>Details</h2>
            <div>
                <span className='font-bold'>ID:</span> {hero.id}
            </div>
            <div className='space-x-2'>
                <span className='font-bold'>Name:</span>
                <span className='uppercase'>{hero.name}</span>
            </div>
            <div className='flex flex-col gap-2 mt-3 border-t'>
                <HeroForm hero={hero} setHero={setHero} />
            </div>
        </>
    )
}
