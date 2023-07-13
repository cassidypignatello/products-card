export interface Product {
  id: number
  title: string
  price: number
}

interface CartItem extends Product {
  quantity: number
}

interface State {
  products: Product[]
  cart: CartItem[]
}

export {}
