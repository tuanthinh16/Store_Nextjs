import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/app.header';
import MenuItem from '../components/Menu';



export default function Adminlayout({children}: {children: React.ReactNode}) {
    return (
    <html lang="en">
        <body>
            <div>
                <div>
                    <Header/>
                </div>
                <div className='mt-20 ml-0 grid grid-cols-1 md:grid-cols-3 md:ml-12'>
                    <div className='max-w-xs'>
                        <MenuItem/>
                    </div>
                    <div className='max-w-full col-span-2'>
                        {children}
                    </div>
                </div>
            </div>
        </body>
    </html>
    )
}