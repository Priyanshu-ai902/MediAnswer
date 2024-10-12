import { Pinecone } from "@pinecone-database/pinecone";
import { HfInference } from "@huggingface/inference"

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN)

export async function queryPineconeVectorStore(
    client: Pinecone,
    indexName: string,
    namespace: string,
    searchQuery: string
): Promise<string> {
    const hfOutput = await hf.featureExtraction({
        model: 'mixedbread-ai/mxbai-embed-large-v1',
        inputs: searchQuery
    })
    console.log(hfOutput)
    return ""
}

