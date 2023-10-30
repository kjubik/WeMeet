
type SecondaryButtonProps = {
    buttonText: string;
    onClick: () => void;
};

function SecondaryButton({ buttonText, onClick }: SecondaryButtonProps) {

    return (
        <button onClick={onClick} className="text-blue-500 font-semibold">
            {buttonText}
        </button>
    );
}

export default SecondaryButton;
