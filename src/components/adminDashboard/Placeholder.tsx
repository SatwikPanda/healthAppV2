const Placeholder = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="aspect-square w-[8rem] rounded-full bg-neutral-400 overflow-hidden relative">
                <div className="aspect-square w-[3.5rem] absolute rounded-full bg-neutral-700 top-4 left-[27.5%]"></div>
                <div className="aspect-square w-[8rem] absolute rounded-full bg-neutral-700 bottom-[-5rem] left-[0rem]"></div>
            </div>
        </div>
    );
}
 
export default Placeholder;