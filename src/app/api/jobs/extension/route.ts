import { NextRequest, NextResponse } from 'next/server';
import { extensionJobs, addExtensionJob } from '@/lib/extensionStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, company } = body;

    if (!title || !company) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing title or company name',
        },
        { status: 400 }
      );
    }

    const newJob = addExtensionJob({ company, role: title });
    console.log('Successfully saved job data from extension:', newJob);

    return NextResponse.json({
      success: true,
      message: 'Job data received by backend!',
      job: newJob,
    });
  } catch (error) {
    console.error('Error parsing extension job data:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid JSON payload received',
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    jobs: extensionJobs,
  });
}
