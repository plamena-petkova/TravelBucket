export default function Register() {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="card w-3xl bg-base-200 shadow-sm">
                <div className="card-body items-center">
                    <h2 className="card-title">Xsmall Card</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">What is your name?</legend>
                        <input type="text" className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">What is your email?</legend>
                        <input type="text" className="input" placeholder="Type here" />
                    </fieldset>
                    <button className="btn btn-primary m-2">Register</button>

                </div>
            </div>
        </div>
    )
}