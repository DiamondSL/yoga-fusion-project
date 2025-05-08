'use client'
import {Box, Button, FormControl, OutlinedInput, Typography} from "@mui/material";
import {ContactsPageFormQuery} from "@/GraphQL/TSQueries/ContactsPageQueries";
import {useQuery} from "@apollo/client";
import background from '../../../../public/icons/gradients/background-pink-other.png'
import renderBlocks from "@/Helpers/BlockRender";


const ContactsForm = () => {
    const formData = useQuery(ContactsPageFormQuery)
    const {data, loading, error} = formData


    return <Box className={'contacts-form'} sx={{backgroundImage: `url(${background.src})`}}>
        <Box className={'wrapper'}>
            {error ? (<Box><Typography color={'error'}>error loading form</Typography></Box>) :
                <>
                    <Box className={'header'}>
                        {!loading && data?.contactsPage?.Form && data?.contactsPage?.Form?.Title &&
                            <Typography variant={'h1'}>{data?.contactsPage?.Form?.Title}</Typography>}
                    </Box>
                    <Box className={'description'}>
                        {!loading && data?.contactsPage?.Form?.Description && renderBlocks({
                            content: data?.contactsPage?.Form?.Description,
                            className: 'description-item'
                        })}
                    </Box>
                    <Box className={'form-wrapper'}>
                        <form noValidate autoComplete="off">
                            <FormControl sx={{maxWidth: '160px', width: '100%'}}>
                                <OutlinedInput sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                                               placeholder="Name"/>
                            </FormControl>
                            <FormControl sx={{maxWidth: '160px', width: '100%'}}>
                                <OutlinedInput sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                                               placeholder="Email"/>
                            </FormControl>
                            <FormControl sx={{maxWidth: '260px', width: '100%'}}>
                                <OutlinedInput sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                                               placeholder="Message"/>
                            </FormControl>
                            <FormControl>
                                <Button variant={'contained'}>Надіслати</Button>
                            </FormControl>
                        </form>
                    </Box>
                </>
            }
        </Box>
    </Box>
}

export default ContactsForm