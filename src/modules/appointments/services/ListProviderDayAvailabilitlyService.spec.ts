import { FakeAppointmentsRepository } from '../repositories/fakes/FakeAppointmentRepository';
import { ListProviderDayAvailabilityService } from './ListProviderDayAvailabilitlyService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list provider day availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 22, 8),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 22, 9),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 22, 10),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 22, 11),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 22, 12),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 22, 13),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 22, 14),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 22, 15),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 22, 16),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 22, 17),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      date: new Date(2021, 7, 23, 17),
    });

    expect(
      await listProviderDayAvailabilityService.execute({
        provider_id: '#123456',
        year: 2021,
        month: 8,
        day: 22,
      })
    ).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: false },
        { hour: 13, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: false },
        { hour: 17, available: false },
      ])
    );
  });
});
