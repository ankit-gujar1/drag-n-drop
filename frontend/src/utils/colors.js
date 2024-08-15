const color=[
    'bg-red-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-green-500',
    'bg-fuchsia-500',
    'bg-violet-500',
];

import { Random } from "random-js";
const random = new Random();

export const getColor=()=>{
    const value = random.integer(0, color.length-1);
    return color[value];
}