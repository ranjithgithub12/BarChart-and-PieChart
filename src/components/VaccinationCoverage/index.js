import './index.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {updatedLast7Days} = props
  console.log(updatedLast7Days)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-coverage-contianer">
      <h1 className="vaccination-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={updatedLast7Days}
          width={1000}
          height={300}
          margin={{top: 20}}
        >
          <XAxis
            dataKey="vaccine_date"
            tick={{stroke: '#94a3b8', strokeWidth: 1}}
          />
          <YAxis tick={{stroke: '#94a3b8', strokeWidth: 0}} />
          <Legend wrapperStyle={{padding: 10}} />
          <Bar dataKey="dose_1" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
