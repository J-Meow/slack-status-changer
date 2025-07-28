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
await setStatus(
    ":terminal:",
    "This was set with a tool I'm making to set Slack statuses",
    prompt("xoxc pls:")!,
    prompt("xoxd pls:")!,
    prompt("subdomain of your slack account:")!
)
