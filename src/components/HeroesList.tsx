import {useEffect, useRef, useState} from "react";
import {Hero} from "../types/hero.ts";
import {Link} from "react-router-dom";
import {useMessages} from "../context/MessageContext.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroesList() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    // const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
    const fetched = useRef(false);
    const {addMessage} = useMessages();

    useEffect(() => {
        if (!fetched.current) {
            fetch(`${apiUrl}/heroes`).then(res => {
                return res.json();
            }).then(data => {
                setHeroes(data);
                addMessage('Heroes loaded.');
            })
            fetched.current = true;
        }

        // // Cleanup code
        // return () => {
        //     // Cleanup code
        // }
    }, [addMessage])

    // const selectedHero = heroes.find(hero => hero.id === selectedHeroId);
    //
    // const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     // setHero({...hero, name: event.target.value})
    //     const updatedName = event.target.value;
    //
    //     setHeroes(prevHeroes => prevHeroes.map(hero => {
    //         if (hero.id === selectedHeroId) {
    //             return {...hero, name: updatedName};
    //         }
    //         return hero;
    //     }))
    // }

    // const handleSelectHero = (id: number) => {
    //     setSelectedHeroId(id);
    // }

    return (
        <>
            <h2 className='text-2xl'>
                My Heroes
            </h2>
            <ul className='flex flex-col gap-2 my-3'>
                {heroes.map(hero => (
                    <Link to={`/heroes/${hero.id}`} key={hero.id}
                          className='flex cursor-pointer'
                          // onClick={() => handleSelectHero(hero.id)}
                    >
                        <span className='bg-slate-700 text-white rounded p-2'>{hero.id}</span>
                        <span className='p-2 bg-slate-300 rounded-r w-full'>{hero.name}</span>
                    </Link>
                ))}
            </ul>

            {/*<HeroDetail hero={selectedHero} onChangeName={handleNameChange} />*/}
        </>
    )
}
