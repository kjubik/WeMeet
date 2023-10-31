
type PrimaryButtonProps = {
    buttonText: string;
    onClick: () => void;
};

function PrimaryButton({ buttonText, onClick }: PrimaryButtonProps) {

    return (
        <button onClick={onClick} className="text-white bg-black font-semibold rounded-full px-6 py-2">
            {buttonText}
        </button>
    );
}

export default PrimaryButton;
