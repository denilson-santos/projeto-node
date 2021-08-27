import 'reflect-metadata';

import { getHours, isBefore, startOfHour } from 'date-fns';

import { inject, injectable } from 'tsyringe';

import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

import AppError from '@shared/errors/AppErrors';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const currentDate = new Date(Date.now());

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (provider_id === user_id)
      throw new AppError('You cannot create an appointment with yourself');

    if (findAppointmentInSameDate)
      throw new AppError('This appointment id already booked');

    if (isBefore(date, currentDate))
      throw new AppError("You can't create an appointment on a past date");

    if (getHours(date) < 8 || getHours(date) > 17)
      throw new AppError(
        'You can only create appointments between 8am and 5pm'
      );

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
