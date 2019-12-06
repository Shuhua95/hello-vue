import Layout from '@/mobile/components/Layout'

const outpatientRouter = {
  path: '/outpatient',
  component: Layout,
  name: 'Outpatient',
  meta: {
    title: '远程门诊'
  },
  children: [
    {
      path: 'patient',
      component: () => import('@/mobile/views/outpatient/Patient.vue'),
    },
    {
      path: 'doctor-detail',
      component: () => import('@/mobile/views/outpatient/DoctorDetail.vue'),
    }
  ]
}

export default outpatientRouter
