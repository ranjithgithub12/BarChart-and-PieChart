import './index.css'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <div className="age-container">
      <h1 className="age-heading">Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="40%"
            data={vaccinationByAge}
            startAngle={0}
            endAngle={360}
            innerRadiud="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-40" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="above 60" fill=" #64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            horizontalAlign="center"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
