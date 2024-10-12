import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'

type Props = {
    role: string,
    content: string
}

const MessageBox = ({ role, content }: Props) => {
    return (
        <Card>
            <CardContent className='p-6 text-sm'>
                {content}
            </CardContent>

            {role != 'user' && <CardFooter className='border-t bg-muted/50 px-6 py-3 text-xs text-muted-foreground'>
                Disclaimer: The medical advice and recommendation provided by this application are for informational purpose only and should not replace professional medical diagonsis, treatment, or advice.
            </CardFooter>}
        </Card>
    )
}

export default MessageBox