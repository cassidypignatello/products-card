export interface Product {
  id: number
  title: string
  price: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface State {
  products: Product[]
  cart: CartItem[]
}
