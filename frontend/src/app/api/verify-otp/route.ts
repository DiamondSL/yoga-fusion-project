import Prelude from "@prelude.so/sdk";
import {NextRequest, NextResponse} from "next/server";

const client = new Prelude({apiToken: process.env.PRELUDE_VERIFICATION_API_KEY});

async function main({phoneNumber, code}: { phoneNumber: string, code: string }) {
    const check = await client.verification.check({
        target: {
            type: "phone_number",
            value: phoneNumber,
        },
        code: code,
    }).then((result) => {return result})

    console.log('check', check);

    return check;
}


export async function POST(req: NextRequest) {
    try {
        const {phoneNumber, code} = await req.json();
        const authentication = await main({phoneNumber, code})
        console.log('Received phoneNumber:', phoneNumber, code);
        return NextResponse.json({data: authentication})
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }
}