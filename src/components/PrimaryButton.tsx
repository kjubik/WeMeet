
type PrimaryButtonProps = {
    buttonText: string;
    onClick: () => void;
};

function PrimaryButton({ buttonText, onClick }: PrimaryButtonProps) {

    return (
        <button onClick={onClick} className="text-white bg-blue-500 font-semibold rounded px-3 py-2">
            {buttonText}
        </button>
    );
}

export default PrimaryButton;
