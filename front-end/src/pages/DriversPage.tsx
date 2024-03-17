import stop from '../assets/busstop.jpg'
import pin from "@/assets/pin.png"

import { useEffect, useState } from "react"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

function DriverComponent({ driver }) {
  return (

    <div className='w-full min-h-32 bg-white border rounded-xl flex px-2 py-4 gap-5'>
      <div className=''>
        <img src={pin} alt="" className='w-24' />
      </div>

      <div>
        <h1 className='text-xl font-bold'>{driver.FirstName} {driver.LastName}</h1>
        <p>Edad: {driver.Age}</p>
        <p>Cédula: {driver.Id}</p>
        <p>Ruta: {driver.Route}</p>
        <p>Vehicle: {driver.Vehicle}</p>
      </div>
    </div>
  )
}

const formSchema = z.object({
  FirstName: z.string().min(2, {
    message: "El largo debe ser mayor a dos carácteres",
  }),
  LastName: z.string().min(2, { message: "El apellido debe ser mayor a dos carácteres" }),
  Age: z.string().min(2, { message: "Inválido" }),
  Id: z.string().min(11, { message: "Cédula Invalida" }),
  Route: z.string().min(2),
  Vehicle: z.string()
})

export default function DriversPage() {

  const [data, setData] = useState([])
  const [stops, setStops] = useState([])
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    fetch('http://localhost:8081/drivers-page')
      .then(response => response.json())
      .then(data => {
        setData(data)
        console.log(data)
      })

    fetch('http://localhost:8081/bus-stops')
      .then(response => response.json())
      .then(stops => {
        setStops(stops)
        console.log(stops)
      })

    fetch('http://localhost:8081/bus-page')
      .then(response => response.json())
      .then(vehicles => {
        setVehicles(vehicles)
        console.log(vehicles)
      })
  }, [])

  const backgroundStyle = {
    backgroundImage: `url(${stop})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "200vw"
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      Age: "",
      Id: "",
      Route: "",
      Vehicle: ""
    },
  })

  // 2. Define a submit handler.
  async function handleSubmit(values: z.infer<typeof formSchema>) {

    try {
      const response = await fetch('http://localhost:8081/drivers-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });
      if (!response.ok) throw new Error('Network response was not ok');

    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }

    console.log(values)
  }

  return (
    <>
      <main>
        <div style={backgroundStyle} className='w-full h-[100vh] flex items-end'>

          <div className='w-full border border-transparent bottom-0 p-10 flex flex-col gap-5 overflow-scroll pb-20'>
            <Drawer>
              <DrawerTrigger><Button className='w-full py-6 bg-black/90'>Ver Conductores</Button></DrawerTrigger>
              <DrawerContent className='p-4 space-y-10'>
                <DrawerHeader>
                  <DrawerTitle>Conductores</DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                </DrawerHeader>

                <div className='max-h-96 overflow-scroll flex flex-col gap-5'>
                  {
                    data.map(data => <DriverComponent driver={data} />)
                  }
                </div>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className='w-12 h-12 absolute bottom-14 right-10 rounded-full bg-blue-900/70'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Añadir Nuevo Conductor</AlertDialogTitle>
                      <AlertDialogDescription>
                        Añade un nuevo conductor a la lista.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="FirstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombres</FormLabel>
                              <FormControl>
                                <Input placeholder="Willy, Pedro, Alberto..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="LastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Apellidos</FormLabel>
                              <FormControl>
                                <Input placeholder="Alcántara, Báez, Mejía..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="Age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Edad</FormLabel>
                              <FormControl>
                                <Input placeholder="20, 40, 60..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="Id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cédula (ID)</FormLabel>
                              <FormControl>
                                <Input placeholder="XXX-XXXXXXX-X" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="Vehicle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Vehículo</FormLabel>
                              <FormControl>

                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Vehículos..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {
                                      vehicles.map((vehicle) => (
                                        <SelectItem value={`${vehicle.Id}`}>{vehicle.Brand} {vehicle.Model} {vehicle.Year}</SelectItem>
                                      ))
                                    }
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="Route"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ruta</FormLabel>
                              <FormControl>

                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Rutas..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {
                                      stops.map((stop, index) => (
                                        <SelectItem key={index} value={stop.Name}>{stop.Name}</SelectItem>
                                      ))
                                    }
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button className='w-full' type="submit">Submit</Button>
                      </form>
                    </Form>

                    <AlertDialogFooter>
                      <AlertDialogCancel className='bg-red-500 text-white'>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>

                  </AlertDialogContent>

                </AlertDialog>


                <DrawerFooter>
                  <DrawerClose className='w-full flex justify-center'>
                    <div className='w-10'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='text-white'><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
                    </div>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

          </div>
        </div>
      </main>
    </>
  )
}
