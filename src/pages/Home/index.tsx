import React, { FC } from "react"
import Card from "../../components/Card"

const Home: FC = () => {
  return(
    <div className="homeContainer">
      <header>
        <a href="/"><h1>Revista</h1></a>
      </header>

      <section>
        <div className="divider">Notícias</div>

        <article>
          <Card url="porschepro.jpg" description="Porsche comemora 20 anos na China com versão especial do 911" />
          <Card url="mclarenpro.jpg" description="McLaren adota pintura especial para o GP de Mônaco de F1" />
          <Card url="audia5pro.jpg" description="Novo Audi A5 Sportback já está em pré-venda no Brasil por R$ 284.990" />
          <Card url="astonmartin.jpg" description="Aston Martin terá “oportunidade perdida” se trocar foco para carro de 2022" />
          <Card url="fiat.jpg" description="Fiat Strada e Toro lideram vendas em 22 estados em abril" />
          <Card url="stockcar.jpg" description="Stock Car: Massa escala pelotão e chega ao primeiro top-10 na categoria" />
        </article>
      </section>
    </div>
  )
}

export default Home