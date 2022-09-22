import * as moment from 'moment';
import * as Queue from 'bull';
import { EnvironmentService } from 'src/environment/environment.service';
import { FCMService } from 'src/core/firebase/services/fcm.service';
import { Injectable } from '@nestjs/common';
import { NotifyFoundSuccessDTO, SupportAgencyJobStatusDTO } from '../dto/support-agency-job-status.dto';


@Injectable()
export class FindingSupportAgencyJobService {
  private queue: Queue.Queue<SupportAgencyJobStatusDTO>;

  constructor(
    private readonly envService: EnvironmentService,
    private readonly fcmService: FCMService
  ) {
    this.queue = new Queue<SupportAgencyJobStatusDTO>(this.constructor.name, this.envService.ENVIRONMENT.REDIS_URL);
    this.queue.process(async (job, done) => {
      await this.fcmService.sendNotification(
        {
          action: 'TECHNICIAN_BUSY',
          payload: JSON.stringify({
            type: 'TECHNICIAN_BUSY'
          }),
        },
        [job.data.userToken]
      )
      done();
    });
  }

  async add(data: SupportAgencyJobStatusDTO) {
    await this.queue.add(
      data,
      {
        jobId: `${data.userId}_${data.type}`,
        delay: moment(data.expiredTime).diff(moment(), 'millisecond'),
        removeOnComplete: true,
      }
    );
  }

  async remove(data: NotifyFoundSuccessDTO) {

    const job = await this.queue.getJob(`${data.userId}_${data.type}`);
    if (!job) {
      return false;
    }
    await this.queue.removeJobs(`${data.userId}_${data.type}`)
    return job.data;
  }
}