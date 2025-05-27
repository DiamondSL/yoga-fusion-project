import {NextRequest, NextResponse} from 'next/server';
import Prelude from "@prelude.so/sdk";

const preludeClient = new Prelude({apiToken: process.env.PRELUDE_VERIFICATION_API_KEY});

async function main(phoneNumber: string) {
    const verification = await preludeClient.verification.create({
        target: {
            type: "phone_number",
            value: phoneNumber,
        },
    }).then((result) => result);

    console.log('prelude:', verification.id, verification);
    return verification
}


export async function POST(req: NextRequest) {

    try {
        const {phoneNumber} = await req.json();
        console.log('Received phoneNumber:', phoneNumber);
        return main(phoneNumber).then((result) => NextResponse.json({status: result.status}, {status: 200}))
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }
}