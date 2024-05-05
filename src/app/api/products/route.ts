import { NextRequest, NextResponse } from "next/server";
import fsPromises from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// step 1: read the json file as string (we will use utf-8 encoding)
// step 2: convert this string into a JSON object (JSON array)
// step 3: manipulate the array (posting/patching/deleting)
// step 4: convert the JSON array back to string
// step 5: write updated JSON array (as text) to the JSON file

const productsFilePath = path.join(process.cwd(), 'public/mocks/products.json');

export async function GET() {
    try {
        const products = await fsPromises.readFile(productsFilePath, 'utf-8');
        const json = JSON.parse(products);

        return NextResponse.json(json);
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "No products found!" }),
            { status: 404, headers: { 'content-type': 'application/json' } });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Step 1: read json file
        const products = await fsPromises.readFile(productsFilePath, 'utf-8')

        // Step 2: parse it into a JSON array
        const jsonArray = JSON.parse(products)

        // Step 3: destructure values from request body
        const { title, description, image, price } = await req.json()

        // Step 4: generate the ID for the new dish
        const id = crypto.randomBytes(16).toString('hex');

        // Step 5: add the new dish to the json array
        jsonArray.push({ id, title, description, image, price })

        // Step 6: convert JSON array back to string
        const updatedData = JSON.stringify(jsonArray)

        // Step 7: write the updated data to the JSON file
        await fsPromises.writeFile(productsFilePath, updatedData)

        // Step 8: return response of a successful post (201)
        return new NextResponse(
            JSON.stringify({ message: "Product created successfully!" }),
            { status: 201, headers: { 'content-type': 'application/json' } }
        )

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
            { status: 500, headers: { 'content-type': 'application/json' } });
    }
}