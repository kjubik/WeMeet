

function ReleaseNotes() {
    const updates = [
        {
            title: 'Added events creation',
            description: "We've added a new subpage for creating events! 🎉 For the time being you can add a custom title and description, but there is more to come soon.",
            date: '2023-10-31',
            isBugFix: false,
        },
        {
            title: 'Logged out after changing subpage',
            description: "We've fixed logging out users after changing subpages. 🙌 You can now navigate between pages without any interruptions.",
            date: '2023-10-26',
            isBugFix: true,
        }
    ]

    return (
        <div>
            <h1 className="text-lg">Updates & Bug Fixes</h1>
            {updates.map((update) => (
                <div className="max-w-sm mb-6">
                    <hr className="my-4"/>
                    <h2 className="text-xl font-semibold mb-1">{update.title}</h2>
                    <h3 className="text-gray-700 font-thin mb-2">{update.date} | {update.isBugFix ? '🛠️ Fix' : '✨Update'}</h3>
                    <p>{update.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ReleaseNotes;
