import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Charts from './Charts';

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: '0px 0px 40px -10px rgba(0,0,0,.2)',
    background: '#fff',
    minHeight: '300px',
    width: '700px',
    padding: 32,
    marginTop: 64
  },
  inputs: {
  },
  input: {
    width: 200,
    margin: 5,
  },
  button: {
    marginLeft: 5,
    marginTop: 16
  },
  title: {
    fontSize: '1.5em',
    marginLeft: 5,
    marginBottom: 16
  },
  viewer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  potable: {
    fontSize: '2.75em',
  },
  loading: {
    fontSize: '1em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Section = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState(null)

  const [ph, setPh] = useState('7.6')
  const [Hardness, setHardness] = useState('160.6')
  const [Solids, setSolids] = useState('39184')
  const [Chloramines, setChloramines] = useState('7.8')
  const [Sulfate, setSulfate] = useState('312.1')
  const [Conductivity, setConductivity] = useState('503.15')
  const [OrganicCarbon, setOrganicCarbon] = useState('13.4')
  const [Trihalomethanes, setTrihalomethanes] = useState('62.1')
  const [Turbidity, setTurbidity] = useState('3.5')

  const [errors, setErrors] = useState({})

  const handlePh = (e) => setPh(e.target.value)
  const handleHardness = (e) => setHardness(e.target.value)
  const handleSolids = (e) => setSolids(e.target.value)
  const handleChloramines = (e) => setChloramines(e.target.value)
  const handleSulfate = (e) => setSulfate(e.target.value)
  const handleConductivity = (e) => setConductivity(e.target.value)
  const handleOrganicCarbon = (e) => setOrganicCarbon(e.target.value)
  const handleTrihalomethanes = (e) => setTrihalomethanes(e.target.value)
  const handleTurbidity = (e) => setTurbidity(e.target.value)
  const handleSubmit = async () => {
    if (loading) return;    

    let errors = validateFields(ph, Hardness, Solids, Chloramines, Sulfate, Conductivity,
      OrganicCarbon, Trihalomethanes, Turbidity);
    if (Object.keys(errors).length) return setErrors(errors);

    let URL = `https://hidden-fortress-95999.herokuapp.com/?ph=${ph}&Hardness=${Hardness}&Solids=${Solids}&Chloramines=${Chloramines}&Sulfate=${Sulfate}&Conductivity=${Conductivity}&Organic_carbon=${OrganicCarbon}&Trihalomethanes=${Trihalomethanes}&Turbidity=${Turbidity}`

    setErrors({})
    setLoading(true)
    setPrediction(null)
    let res = await axios.post(URL)

    setLoading(false)
    setPrediction(res.data.prediction)
    console.log(res)
  }

  const renderPrediction = () => {
    if (prediction === null) return;
    if (prediction === 1) {
      return <h1 className={classes.potable} style={{color: 'blue'}}>Potable!</h1>
    }
    if (prediction === 0) {
      return <h1 className={classes.potable} style={{color: 'red'}}>Not Potable</h1>
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.viewer}>
        {renderPrediction()}
        {loading ? <div className={classes.loading}>
          <div><CircularProgress /></div>
          <div>Booting server and analyzing water sample with machine learning model...</div>
        </div> : null}
      </div>
      <h2 className={classes.title}>Water Sample Classifier</h2>
      <div>
        <InputField label="ph" value={ph} handler={handlePh} max={14} error={errors.ph} />
        <InputField label="Hardness" value={Hardness} handler={handleHardness} error={errors.Hardness}/>
        <InputField label="Solids" value={Solids} handler={handleSolids} error={errors.Solids} />
        <InputField label="Chloramines" value={Chloramines}  handler={handleChloramines} error={errors.Chloramines}/>
        <InputField label="Sulfate" value={Sulfate} handler={handleSulfate} error={errors.Sulfate}/>
        <InputField label="Conductivity" value={Conductivity} handler={handleConductivity} error={errors.Conductivity}/>
        <InputField label="Organic_carbon" value={OrganicCarbon} handler={handleOrganicCarbon} error={errors.OrganicCarbon}/>
        <InputField label="Trihalomethanes" value={Trihalomethanes} handler={handleTrihalomethanes}error={errors.Trihalomethanes} />
        <InputField label="Turbidity" value={Turbidity} handler={handleTurbidity} error={errors.Turbidity} />
        <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          Analyze Sample
        </Button>
      </div>
      <div>
        {prediction === null ? null : 
          <Charts ph={ph} Hardness={Hardness} Solids={Solids} Chloramines={Chloramines} Sulfate={Sulfate} Conductivity={Conductivity} OrganicCarbon={OrganicCarbon} Trihalomethanes={Trihalomethanes} Turbidity={Turbidity} />
        }
      </div>
    </div>
  );
};

const InputField = ({label, value, handler, max, error}) => {
  const classes = useStyles();

  return <TextField className={classes.input} type="number" label={label} variant="outlined" value={value} onChange={handler} inputProps={{min: 0, max: max}} error={error ? true : false} helperText={error} />
}

const validateFields = (ph, Hardness, Solids, Chloramines, Sulfate, Conductivity,
  OrganicCarbon, Trihalomethanes, Turbidity) => {
  let errors = {}

  if (ph < 0 || ph > 14) errors.ph = 'ph must be between 0 and 14'
  if (Hardness < 0) errors.Hardness = 'Hardness must be a positive value'
  if (Solids < 0) errors.Solids = 'Solids must be a positive value'
  if (Chloramines < 0) errors.Chloramines = 'Chloramines must be a positive value'
  if (Sulfate < 0) errors.Sulfate = 'Sulfate must be a positive value'
  if (Conductivity < 0) errors.Conductivity = 'Conductivity must be a positive value'
  if (OrganicCarbon < 0) errors.OrganicCarbon = 'OrganicCarbon must be a positive value'
  if (Trihalomethanes < 0) errors.Trihalomethanes = 'Trihalomethanes must be a positive value'
  if (Turbidity < 0) errors.Turbidity = 'Turbidity must be a positive value'

  if (!ph) errors.ph = 'ph must not be empty'
  if (!Hardness) errors.Hardness = 'Hardness must not be empty'
  if (!Solids) errors.Solids = 'Solids must not be empty'
  if (!Chloramines) errors.Chloramines = 'Chloramines must not be empty'
  if (!Sulfate) errors.Sulfate = 'Sulfate must not be empty'
  if (!Conductivity) errors.Conductivity = 'Conductivity must not be empty'
  if (!OrganicCarbon) errors.OrganicCarbon = 'OrganicCarbon must not be empty'
  if (!Trihalomethanes) errors.Trihalomethanes = 'Trihalomethanes must not be empty'
  if (!Turbidity) errors.Turbidity = 'Turbidity must not be empty'

  return errors;
}

export default Section;