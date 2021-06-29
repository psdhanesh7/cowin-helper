module.exports = (email) => {
    return `
        <html>
            <body>
                <div style="text-align: left">
                    <h3>Your preffered vaccination center is avilable</h3>
                    <p>${email.body}</p>
                </div>
            </body>
        </html>
    `;
}