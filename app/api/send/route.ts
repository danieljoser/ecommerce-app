import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = 'http://localhost:3000';


export async function POST(request: Request) {
    const {email: email, token: token} = await request.json();
    const confirmationLink = `${domain}/verify-email?token=${token}`;
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'verify your email',
            html: `<p>Click on the following <a href=${confirmationLink}>link</a> to verify your email</p>`
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}