async function setStatus(
    emoji: string,
    statusText: string,
    xoxc: string,
    xoxd: string,
    subdomain: string
) {
    console.log(
        await (
            await fetch(
                `https://${subdomain}.slack.com/api/users.profile.set?_x_gantry=true`,
                {
                    credentials: "include",
                    headers: {
                        "Content-Type":
                            "multipart/form-data; boundary=----formboundary",
                        Cookie: "d=" + xoxd,
                    },
                    body: `------formboundary\r\nContent-Disposition: form-data; name=\"token\"\r\n\r\n${xoxc}\r\n------formboundary\r\nContent-Disposition: form-data; name=\"profile\"\r\n\r\n${JSON.stringify({ status_emoji: emoji, status_expiration: 0, status_text: statusText, status_text_canonical: "", ooo_message: "" })}\r\n`,
                    method: "POST",
                }
            )
        ).json()
    )
}
const xoxc = prompt("xoxc pls:")!
const xoxd = prompt("xoxd pls:")!
const subdomain = prompt("subdomain of your slack account:")!
setInterval(async () => {
    const time = new Date()
    const currentClockTimeRounded =
        (((time.getHours() + 11) % 12) + 1).toString() +
        (time.getMinutes() >= 30 ? "30" : "")
    await setStatus(
        ":clock" + currentClockTimeRounded + ":",
        `It's currently ${((time.getHours() + 11) % 12) + 1}:${time.getMinutes().toString().padStart(2, "0")} ${time.getHours() >= 12 ? "PM" : "AM"} for me.`,
        xoxc,
        xoxd,
        subdomain
    )
}, 6000)
